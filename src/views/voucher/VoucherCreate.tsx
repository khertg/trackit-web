import React from 'react';
import { VoucherForm } from '../../components/VoucherForm';
import { create } from '../../services/voucher';
import history from '../../history';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';

export const VoucherCreate: React.FC = () => {
  const dispatch = useDispatch();

  const onCreate = async (data: any) => {
    const { voucher_code, buyer, sold } = data;
    dispatch(showLoading());
    create( voucher_code, buyer, sold)
      .then((data) => {
        history.push('/voucher');
      })
      .catch((err) => {
        console.log(err);
        dispatch(hideLoading());
      });
  };
  return (
    <div>
      <VoucherForm onSubmit={onCreate} />
    </div>
  );
};
