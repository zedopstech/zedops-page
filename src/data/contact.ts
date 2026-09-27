/** One office. The licence line is optional: only the registered entity carries one. */
export interface Office {
  name: string;
  role: string;
  address: readonly string[];
  licence?: string;
}

/** Company contact details. The Dubai office is the registered free-zone entity. */
export const offices: readonly Office[] = [
  {
    name: "Dubai",
    role: "Business and customers",
    address: [
      "Business Centre, 3rd Floor, A3 Building",
      "Business Park, Dubai South Business Hub",
      "Dubai, United Arab Emirates",
    ],
    // Shown under the address wherever the office is listed, since a free-zone
    // licence number is part of a business's legal identification.
    licence: "Licence no. 14521",
  },
];

export const contact = {
  address: offices[0].address,
  email: "hello@zedops.com",
  salesEmail: "sales@zedops.com",
  securityEmail: "security@zedops.com",
  hours: "Monday to Friday, 9:00 to 18:00 GST",
};
