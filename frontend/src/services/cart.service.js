import createApiClient from "./api.service";

class CartService {
  constructor(baseUrl = "/api/carts") {
    this.api = createApiClient(baseUrl);
  }

  async getByUserid() {
    try {
      var result = await this.api.get("/infos");
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async addCartInfoByUserId(data) {
    try {
      var result = await this.api.post("/infos", data);
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async updateCartInfoById(data) {
    try {
      var result = await this.api.put("/infos", data);
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async updateCartInfoByCartId(id, data) {
    try {
      var result = await this.api.put(`/infos/${id}`, data);
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async deleteCartInfoById(id) {
    try {
      var result = await this.api.delete(`/infos/${id}`);
      return result.data;
    } catch (error) {
      return null;
    }
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
}

export default new CartService();