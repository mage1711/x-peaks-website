import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";

const PromoCodePopup = ({ isOpen, onClose, packageId, onApplyDiscount }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const validatePromoCode = async () => {
    setLoading(true);
    setError('');
    try {
      const token = "patylXQNLKEU0QrA8.cd2ee99e8d992f0f2b171add2aecdfdd0fa801ffe98a0339ecf35752b833be0b";
      const endpoint = "https://api.airtable.com/v0/appvkXC9afBnDgI3g/Coupons";
      
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const coupons = response.data.records;
      const couponRecord = coupons.find(r => r.fields.coupon_code === code);
      
      if (!couponRecord) {
        setError(t('invalid_code'));
        return;
      }

      const coupon = couponRecord.fields;
      
      const now = new Date();
      const startDate = new Date(coupon.validity_date_start);
      const endDate = new Date(coupon.validity_date_end);

      if (now < startDate || now > endDate) {
        setError(t('expired_code'));
        return;
      }

      if (!coupon.supported_packages.includes(packageId)) {
        setError(t('code_not_valid_package'));
        return;
      }

      if (coupon.uses >= coupon.max_uses) {
        setError(t('code_max_uses'));
        return;
      }

      onApplyDiscount(coupon.discount_percent, couponRecord.id);
      onClose();

    } catch (error) {
      setError(t('error_validating_code'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#3451A3] p-8 rounded-xl w-96 text-white">
        <h3 className="text-xl font-bold mb-6">{t('enter_promo_code')}</h3>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="w-full p-3 border rounded-lg mb-4 bg-white text-[#132441] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DAF561]"
          placeholder={t('promo_code')}
        />
        {error && <p className="text-[#DAF561] mb-6">{error}</p>}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-white hover:text-[#DAF561] transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            onClick={validatePromoCode}
            className="px-6 py-3 bg-[#DAF561] text-[#132441] rounded-lg hover:bg-opacity-90 transition-colors font-medium"
            disabled={loading}
          >
            {loading ? t('validating') : t('apply')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoCodePopup; 