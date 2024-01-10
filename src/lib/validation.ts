import * as Yup from "yup";

export const createArticleSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email().required('Email is requried'),
  title: Yup.string().required("title is required"),
  content: Yup.string().required("Content is required")
});
