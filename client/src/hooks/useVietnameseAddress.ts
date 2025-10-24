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

// Global cache to avoid re-fetching data
let cachedCities: City[] | null = null;
let fetchPromise: Promise<City[]> | null = null;

export const useVietnameseAddress = () => {
  const [cities, setCities] = useState<City[]>(cachedCities || []);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(!cachedCities);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If already cached, use it immediately
    if (cachedCities) {
      setCities(cachedCities);
      setLoading(false);
      return;
    }

    // If already fetching, wait for it
    if (fetchPromise) {
      fetchPromise
        .then((data) => {
          setCities(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        });
      return;
    }

    // Start fetching
    fetchPromise = fetch(
      'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch address data');
        }
        return response.json();
      })
      .then((data: City[]) => {
        cachedCities = data;
        return data;
      });

    fetchPromise
      .then((data) => {
        setCities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
        fetchPromise = null;
      });
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
      return selectedCity.Districts;
    }
    return [];
  };

  const updateWards = (districtId: string, districtsToSearch?: District[]) => {
    if (!districtId) {
      setWards([]);
      return;
    }

    const searchDistricts = districtsToSearch || districts;
    const selectedDistrict = searchDistricts.find(district => district.Id === districtId);
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