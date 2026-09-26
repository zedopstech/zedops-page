/** Company contact details. Dubai address is a placeholder until the free zone address is confirmed. */
export const offices = [
  {
    name: "Dubai",
    role: "Business and customers",
    address: ["Dubai free zone office", "Address to be confirmed", "United Arab Emirates"],
  },
  {
    name: "Madurai",
    role: "Product and engineering",
    address: ["Venus Plaza, 120 Feet Road", "Ramalakshmi Nagar, Moondrumavadi", "Madurai, Tamil Nadu 625007, India"],
  },
] as const;

export const contact = {
  address: offices[0].address,
  email: "hello@zedops.com",
  salesEmail: "sales@zedops.com",
  securityEmail: "security@zedops.com",
  phone: "+91 97878 82297",
  hours: "Monday to Friday, 9:00 to 18:00 GST",
};
