/**
 * https://www.zipcodeapi.com/API
 * @param {string} city
 * @param {string} state
 * @returns
 */
export const getZipcodeByService = async (city, state) => {
  try {
    const ZIP_CODE_API_KEY = 'js-ga4rPDqEr2VgiyXp3lArDnobN8ma6gYtXUXPiwezRN0nljVGVZhT5bpsyZXVu0cA';
    const response = await fetch(
      `https://www.zipcodeapi.com/rest/${ZIP_CODE_API_KEY}/city-zips.json/${city}/${state}`
    );
    const data = await response.json();
    return data?.zip_codes?.[0] || null;
  } catch (e) {
    return null;
  }
};
