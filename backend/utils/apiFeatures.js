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
          name: { [Op.iLike]: `%${actor}%` },
        },
        required: true,
      });
    }
    return this;
  }

  title() {
    const { title } = this.queryString;
    if (title) {
      this.options.where.title = { [Op.iLike]: `%${title}%` };
    }
    return this;
  }

  search() {
    const { search } = this.queryString;
    if (search) {
      this.options.where = {
        ...this.options.where,
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { "$actors.name$": { [Op.iLike]: `%${search}%` } },
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
    const sortField = sort || "id";
    const sortOrder = (order || "ASC").toUpperCase();
    this.options.order = [[sortField, sortOrder]];
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
