/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

export interface Metric {
  id: string;
  value: string;
  label: string;
  description: string;
  suffix?: string;
}

export interface BusinessArea {
  id: string;
  title: string;
  iconName: string;
  description: string;
  details: string[];
  process: string[];
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  tag: string;
  summary: string;
  detail: string;
  imageUrl?: string;
}

export interface Partner {
  name: string;
  logoText: string;
  role: string;
  category: 'ecommerce' | 'payment' | 'logistics';
}

export interface OfficeAddress {
  country: string;
  city: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  coordinates: { x: number; y: number };
}
