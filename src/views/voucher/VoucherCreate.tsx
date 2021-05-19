import React from 'react';
import { VoucherForm } from '../../components/VoucherForm';
import { create } from '../../services/voucher';
import history from '../../history';
import { LoadingState } from '../../state/reducers/loadingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';

export const VoucherCreate: React.FC = () => {
  //Global State
  const loading = useSelector<LoadingState>((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const onCreate = async (data: any) => {
    const { code, sold_to, is_sold } = data;
    dispatch(showLoading());
    create(code, sold_to, is_sold)
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
