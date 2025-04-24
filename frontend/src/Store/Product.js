import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all the fields" };
    }

    const res = await fetch("api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    let data = {};
    try {
      if (res.headers.get("Content-Length") !== "0") {
        data = await res.json();
      }
    } catch (err) {
      console.error("Failed to parse JSON:", err);
    }

    if (res.ok) {
      set((state) => ({
        products: [...state.products, data.data],
      }));
      return { success: true, message: "Product created successfully" };
    } else {
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }
  },

  fetchProducts: async () => {
    const res = await fetch("api/products");
    let data = {};
    try {
      if (res.headers.get("Content-Length") !== "0") {
        data = await res.json();
      }
    } catch (err) {
      console.error("Failed to parse JSON:", err);
    }

    if (res.ok) {
      set({ products: data.data });
    } else {
      console.error(data.message || "Something went wrong");
    }
  },

  deleteProduct: async (id) => {
    const res = await fetch(`api/products/${id}`, {
      method: "DELETE",
    });

    let data = {};
    try {
      if (res.headers.get("Content-Length") !== "0") {
        data = await res.json();
      }
    } catch (err) {
      console.error("Failed to parse JSON:", err);
    }

    if (res.ok) {
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      return { success: true, message: "Product deleted successfully" };
    } else {
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    let data = {};
    try {
      if (res.headers.get("Content-Length") !== "0") {
        data = await res.json();
      }
    } catch (err) {
      console.error("Failed to parse JSON:", err);
    }

    if (res.ok) {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? { ...product, ...data.data } : product
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } else {
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }
  },
}));
