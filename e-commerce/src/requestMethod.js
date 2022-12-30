import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjkyZTFlNTc2NzMzNjg2ZjgyODc3ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2ODEwMTM4MiwiZXhwIjoxNjY4MzYwNTgyfQ.d0CBzdj6QqoMovju8IPYZ5vDLRe4TOEtM5Tr6-nPtkc";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
