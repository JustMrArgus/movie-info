const { Op } = require("sequelize");

class APIFeatures {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
    this.options = {
      where: {},
      include: [],
    };
  }

  actor() {
    const { actor } = this.queryString;
    if (actor) {
      this.options.include.push({
        association: "actors",
        where: {
          name: { [Op.like]: `%${actor}%` },
        },
        required: true,
      });
    }
    return this;
  }

  title() {
    const { title } = this.queryString;
    if (title) {
      this.options.where.title = { [Op.like]: `%${title}%` };
    }
    return this;
  }

  search() {
    const { search } = this.queryString;
    if (search) {
      this.options.where = {
        ...this.options.where,
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { "$actors.name$": { [Op.like]: `%${search}%` } },
        ],
      };

      if (!this.options.include.find((i) => i.association === "actors")) {
        this.options.include.push({
          association: "actors",
          required: false,
        });
      }
    }
    return this;
  }

  sort() {
    const { sort, order } = this.queryString;
    const sortField = sort || "title";
    const sortOrder = (order || "ASC").toUpperCase();

    if (sortField === "title") {
      this.options.order = [
        [
          this.model.sequelize.literal(`
          CASE 
            WHEN LOWER(title) LIKE 'є%' THEN 'е'
            WHEN LOWER(title) LIKE 'і%' THEN 'и'
            WHEN LOWER(title) LIKE 'ї%' THEN 'й'
            WHEN LOWER(title) LIKE 'ґ%' THEN 'г'
            ELSE LOWER(title)
          END
        `),
          sortOrder,
        ],
      ];
    } else {
      this.options.order = [[sortField, sortOrder]];
    }

    return this;
  }

  limit() {
    const { limit } = this.queryString;
    if (!limit) return this;
    this.options.limit = parseInt(limit, 10);
    return this;
  }

  offset() {
    const { offset } = this.queryString;
    if (!offset) return this;
    this.options.offset = parseInt(offset, 10);
    return this;
  }

  async exec() {
    return this.model.findAll(this.options);
  }
}

module.exports = APIFeatures;
