import apiAuth from "./baseAuth";

const BASE_MOMO = import.meta.env.VITE_API_MOMO;
// Example: http://localhost:4008/api/momo

export const momoApi = {
  // protected route
  momoPayment(paymentData) {
    return apiAuth.post(`${BASE_MOMO}`, paymentData);
  },
};
