const API_BASE_URL = 'http://localhost:8080/api';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Auth API calls
export const auth = {
  login: (email: string, password: string) => 
    fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
};

// Booking API calls
export const bookings = {
  create: (bookingData: any) =>
    fetchWithAuth('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),

  getAll: () => fetchWithAuth('/bookings'),

  cancel: (id: number) =>
    fetchWithAuth(`/bookings/${id}`, {
      method: 'DELETE',
    }),
};

// Barber API calls
export const barbers = {
  getAll: () => fetchWithAuth('/barbers'),
  
  getOne: (id: number) => fetchWithAuth(`/barbers/${id}`),

  getAvailability: (barberId: string, date: string) =>
    fetchWithAuth(`/barbers/${barberId}/availability?date=${date}`),
};

// Service API calls
export const services = {
  getAll: () => fetchWithAuth('/services'),
}; 