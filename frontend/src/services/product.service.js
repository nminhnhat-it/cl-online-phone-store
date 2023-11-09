import axios from "axios";
import createApiClient from "./api.service";

class ProductService {
  constructor(baseUrl = "/api/products") {
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
      var result = await axios.post('/api/products', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      return result.data;
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
      return result.data
    } catch (error) {
      return null;
    }
  }

  async update(id, data) {
    try {
      var result = await this.api.put(`/${id}`, data);
      return result.data
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

  async addImage(data) {
    try {
      var result = await axios.post('/api/products/image', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async addVersion(data) {
    try {
      var result = await axios.post('/api/products/version', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async updateVersion(id, data) {
    try {
      var result = await axios.put(`/api/products/version/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async deleteImage(id) {
    try {
      var result = await this.api.delete(`/image/${id}`);
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async deleteVersion(id) {
    try {
      var result = await this.api.delete(`/version/${id}`);
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async getVersion(id) {
    try {
      var result = await this.api.get(`/version/${id}`);
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async isFocusProduct(id, data) {
    try {
      var result = await this.api.put(`/focus/${id}`, data);
      return result.data;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  async addFocusImage(id, data) {
    try {
      var result = await axios.post(`/api/products/focus/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      return result.data;
    } catch (error) {
      return null;
    }
  }

  async addFocusImageBg(id, data) {
    try {
      var result = await axios.post(`/api/products/focusBg/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      return result.data;
    } catch (error) {
      return null;
    }
  }
}

export default new ProductService();