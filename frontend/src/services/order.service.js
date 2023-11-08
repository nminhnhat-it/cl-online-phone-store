import createApiClient from "./api.service";

class OrderService {
  constructor(baseUrl = "/api/orders") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      var result = await this.api.get("/");
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async create(data) {
    try {
      var result = await this.api.post("/", data);
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  async get(id) {
    try {
      var result = await this.api.get(`/${id}`);
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async update(id, data) {
    try {
      var result = await this.api.put(`/${id}`, data);
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async delete(id) {
    try {
      var result = await this.api.delete(`/${id}`);
      return result.data;
    } catch (error) {
      return null;
    }
  }
}

export default new OrderService();