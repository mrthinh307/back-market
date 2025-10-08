import { useState, useEffect } from 'react';

export interface Ward {
  Id: string;
  Name: string;
}

export interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

export interface City {
  Id: string;
  Name: string;
  Districts: District[];
}



export const useVietnameseAddress = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch address data');
        }
        const data: City[] = await response.json();
        setCities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateDistricts = (cityId: string) => {
    if (!cityId) {
      setDistricts([]);
      setWards([]);
      return;
    }

    const selectedCity = cities.find(city => city.Id === cityId);
    if (selectedCity) {
      setDistricts(selectedCity.Districts);
      setWards([]);
    }
  };

  const updateWards = (districtId: string) => {
    if (!districtId) {
      setWards([]);
      return;
    }

    const selectedDistrict = districts.find(district => district.Id === districtId);
    if (selectedDistrict) {
      setWards(selectedDistrict.Wards);
    }
  };

  const getCityName = (cityId: string): string => {
    return cities.find(city => city.Id === cityId)?.Name || '';
  };

  const getDistrictName = (districtId: string): string => {
    return districts.find(district => district.Id === districtId)?.Name || '';
  };

  const getWardName = (wardId: string): string => {
    return wards.find(ward => ward.Id === wardId)?.Name || '';
  };

  return {
    cities,
    districts,
    wards,
    loading,
    error,
    updateDistricts,
    updateWards,
    getCityName,
    getDistrictName,
    getWardName,
  };
};