import API from "./api";

export const getLenders = async (params) => {
  const res = await API.get("/lender/list", { params });
  return res.data;
};
