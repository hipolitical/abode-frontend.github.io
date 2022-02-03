import axios from 'axios';
import {
  STATUS_APPROVED,
  STATUS_DENIED,
  STATUS_REQUESTED,
} from '../utils/consts';

const BASE_URL = 'http://52.247.76.204:8080';

function getSingleAccount(id) {
  return axios
    .get(`${BASE_URL}/trading_partners/${id}`)
    .then((res) => {
      return res.data;
    });
}

function getUserInfo(id) {
  return axios
    .get(`${BASE_URL}/users/${id}`)
    .then((res) => {
      return res.data;
    });
}

function getAllUsers() {
  return axios
    .get(`${BASE_URL}/users?limit=-1`)
    .then((res) => {
      return res.data.items || [];
    });
}

function createRequest(info) {
  const { requesterId, targetId } = info

  return axios
    .put(
      `${BASE_URL}/users/${requesterId}/related/affiliations/${targetId}`,
      {
        "user-id": requesterId,
      }
    )
    .then((res) => {
      return res.data;
    })
}


function cancelRequest(info) {
  const { requesterId, targetId } = info
  const headers = {
    "Content-Type": "application/json",
    "user-id": requesterId,
  };

  return axios
    .delete(
      `${BASE_URL}/users/${requesterId}/related/affiliations/${targetId}`,
      { headers }
    )
    .then((res) => {
      return res.data;
    });
}

function grantAccess(info) {
  const { requestedById, requesterId, targetId } = info

  return axios
    .put(
      `${BASE_URL}/users/${requestedById}/related/affiliations/${targetId}`,
      {
        "user-id": requesterId,
      }
    )
    .then((res) => {
      return res.data;
    });
}

function declineAccess(info) {
  const { requestedById, requesterId, targetId } = info
  const headers = {
    "Content-Type": "application/json",
    "user-id": requesterId,
  };

  return axios
    .delete(
      `${BASE_URL}/users/${requestedById}/related/affiliations/${targetId}`,
      { headers }
    )
    .then((res) => {
      return res.data;
    });
}

function getAllAccounts(params) {
  const query = params?.query || '';
  const limit = params?.limit || 10;
  const page = params?.page || 0;
  const userId = params.userId;

  return Promise.all([
    axios.get(`${BASE_URL}/trading_partners/search?query=${query}&page=${page + 1}&limit=${limit}&all_fields=true`),
    axios.get(`${BASE_URL}/users/${userId}/related/affiliations?query=${query}&page=${page + 1}&limit=${limit}&status=${STATUS_APPROVED}&all_fields=true`),
    axios.get(`${BASE_URL}/users/${userId}/related/affiliations?query=${query}&page=${page + 1}&limit=${limit}&status=${STATUS_REQUESTED}&all_fields=true`),
  ]).then((res) => {
    const responseItems = res[0].data?.items || [];
    const approvedIds = (res[1].data?.items || []).map(item => item.id);
    const requestIds = (res[2].data?.items || []).map(item => item.id);
    const rows = responseItems
      .map((item, index) => ({
        ...item,
        status: approvedIds.includes(item.id) ? STATUS_APPROVED
          : requestIds.includes(item.id) ? STATUS_REQUESTED : STATUS_DENIED,
      }))
      .map((item) => ({
        ...item,
        role: String(item.role).replaceAll(';', ', '),
      }));
    return {
      headers: [
        { label: 'Name', field: 'legal_name', isLink: true },
        { label: 'Company Type', field: 'company_type' },
        { label: 'Entity Type', field: 'entity_type' },
        { label: 'Role', field: 'role' },
        { label: 'Legal Status', field: 'legal_status' },
      ],
      count: res[0].data?.count || 0,
      rows,
    };
  });
}

function getMyAccounts(params) {
  const userId = params.userId;
  const query = params?.query || '';
  const limit = params?.limit || 10;
  const page = params?.page || 0;
  return Promise.all([
      axios.get(`${BASE_URL}/users/${userId}/related/affiliations?query=${query}&page=${page + 1}&limit=${limit}&status=${STATUS_APPROVED}&all_fields=true`),
      axios.get(`${BASE_URL}/users/${userId}/related/affiliations?query=${query}&page=${page + 1}&limit=${limit}&status=${STATUS_REQUESTED}&all_fields=true`),
    ]).then((res) => {
      const responseItems = [...res[0].data?.items, ...res[1].data?.items] || [];
      const rows = responseItems
      .map((item) => ({
        ...item,
        role: item.role.replaceAll(';', ', '),
      }));
      return {
        headers: [
          { label: 'Name', field: 'display_name', isLink: true },
          { label: 'Role', field: 'role' },
        ],
        rows,
      };
    });
}

function getRequests(params) {
  const userId = params.userId;
  const query = params?.query || '';
  const limit = params?.limit || 10;
  const page = params?.page || 0;
  const userType = params.userType;
  const endpointUrl = userType === 'admin' ?
    `${BASE_URL}/users/admin/affiliations?status=${STATUS_REQUESTED}&all_fields=true`
    : `${BASE_URL}/users/${userId}/related/affiliations?query=${query}&page=${page + 1}&limit=${limit}&status=${STATUS_REQUESTED}`;
  const headers = userType === 'admin' ? {
    "user-id": userId,
  } : {};

  return axios
    .get(endpointUrl, { headers })
    .then((res) => {
      const rows = res.data?.items || [];
      return {
        headers: [
          { label: 'Name', field: 'target.legal_name', isLink: true },
          { label: 'Requester', field: 'source.displayName' },
          { label: 'Email', field: 'source.mail' },
          { label: 'Requested', field: 'source.createdDateTime' },
        ],
        rows,
      };
    });
}

function getAccountUsers(id) {
  return Promise.all([
    axios.get(`${BASE_URL}/trading_partners/${id}/inverse/affiliations`),
    getSingleAccount(id),
  ]).then((res) => {
    const responseItems = res[0].data?.items || [];
    const rows = responseItems
      .map((item, index) => ({
        ...item,
        target_id: id,
        legal_name: res[1].display_name,
      }));
    return {
      headers: [
        { label: 'Name', field: 'display_name' },
        { label: 'Role', field: 'role' },
        { label: 'Email', field: 'email' },
        { label: 'Joined', field: 'joined_date' },
        { label: 'Status', field: 'status' },
        { label: '', field: '' },
      ],
      rows,
    };
  });
}

export {
  getSingleAccount,
  getAllUsers,
  getUserInfo,
  createRequest,
  cancelRequest,
  grantAccess,
  declineAccess,
  getMyAccounts,
  getAllAccounts,
  getRequests,
  getAccountUsers,
}