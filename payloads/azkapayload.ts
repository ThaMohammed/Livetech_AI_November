function generateRandomAlphanumeric(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function generateRandomPhoneNumber(): string {
  // Ensures the first digit is non-zero
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  const remainingDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
  return `${firstDigit}${remainingDigits}`;
}

 export function createPayload(): string {
  const payload = [
    {
      user_id: "31",
      is_submit: null,
      name: generateRandomAlphanumeric(10),
      gender: "male",
      address: "Ameerpet",
      state: "TG",
      phone: generateRandomPhoneNumber(),
      town: null,
      mla: null,
      mandal: null,
      mp: null,
      religion: null,
      age: null,
      caste: null,
      ward: null,
      familymember: null,
      children: null,
      earningmembers: null,
      females: null,
      occupation: null,
      totalmale: null,
      totalearner: null,
      totaldebt: null,
      savingpermonth: null,
      interestrate: null,
      sourcedebt: null,
      streetroad: null,
      tvroads: null,
      districtroads: null,
      transportation: null,
      hospitals: null,
      schoolfacility: null,
      facilityandavailability: null,
      votefor: null,
      created_at: "2024-03-21 18:16:41",
      updated_at: "2024-03-21 18:16:41"
    }
  ];

  return JSON.stringify(payload, null, 2); // Pretty-printed JSON string
}