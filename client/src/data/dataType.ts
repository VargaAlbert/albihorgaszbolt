import URL from "../data/Url";

import axios from 'axios';

export type ProductDataType = {
    readonly ID_PRODUC: number;
    readonly EAN: number;
    readonly PRODUCT: string;
    readonly SKUPINA: number;
    readonly ROZMER: string;
    readonly DESCRIPTION: string;
    readonly IMGURL_NO_WATER: string;
    readonly CENA_S_DPH_EU_HUF: number;
    readonly SORTIMENT: string;

    readonly IMGURL_NO_WATER_2?: string,
    readonly IMGURL_NO_WATER_3?: string,
    readonly IMGURL_NO_WATER_4?: string,
    readonly IMGURL_NO_WATER_5?: string,
    readonly IMGURL_NO_WATER_6?: string,
    readonly IMGURL_NO_WATER_7?: string,
    readonly IMGURL_NO_WATER_8?: string,
    readonly IMGURL_NO_WATER_9?: string,
    readonly IMGURL_NO_WATER_10?: string,
    readonly IMGURL_NO_WATER_11?: string,
    readonly IMGURL_NO_WATER_12?: string,
    readonly IMGURL_NO_WATER_13?: string,

    readonly VARIANT?: number;
    readonly PACKAGING: number;
    readonly HMOTNOST: number;
    readonly CENA_S_DPH_EU: number;

    readonly VIDEA?: string;
    
    readonly SKLADOM: string;
    readonly SKLADOVOST: number;
    readonly PRIJEM: string;
}; 

export const fetchData = async () => {
    try {
      console.log(`${URL}/products`)
      const response = await axios.get(`${URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Hiba történt:', error);
      return [];
    }
  };

