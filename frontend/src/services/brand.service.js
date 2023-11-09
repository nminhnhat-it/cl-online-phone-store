import axios from "axios";
import createApiClient from "./api.service";

class BrandService {
  constructor(baseUrl = "/api/brands") {
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
      var result = await axios.post('/api/brands', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      return result.data;
    } catch (error) {
      console.log(error)
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
    try {
      var result = await axios.put(`/api/brands/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
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