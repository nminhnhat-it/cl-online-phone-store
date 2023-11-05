import createApiClient from "./api.service";

class BrandService {
  constructor(baseUrl = "/api/brands") {
    this.api = createApiClient(baseUrl);
  }

  async verifyPermission() {
    try {
      var result = await this.api.post("/verifyPermission");
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async login(data) {
    try {
      var result = await this.api.post("/login", data)
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async logout() {
    var result = await this.api.post("/logout")
    return result.data;
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
      return result.data
    } catch (error) {
      return null;
    }
  }

  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  async get(slug) {
    try {
      var result = await this.api.get(`/${slug}`);
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async update(id, data) {
    console.log(data)
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

export default new BrandService();