import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import history from '../../history';
import { NotFound } from '../NotFound';
import { LoadingState } from '../../state/reducers/loadingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../state/actions/loadingAction';
import { ILoad } from '../../models/load';
import { edit, get } from '../../services/load';
import { LoadForm } from '../../components/LoadForm';

interface ParamTypes {
  id: string;
}

export const LoadEdit: React.FC = () => {
  //Global State
  const loading = useSelector<LoadingState>((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  //Local State
  const [load, setLoad] =
    useState<{
      buyer: string;
      phone_number: string;
      amount: number;
      paid: boolean;
    }>();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(showLoading());
      await get(id)
        .then((loadData: ILoad) => {
          dispatch(hideLoading());
          setLoad({
            buyer: loadData.buyer,
            phone_number: loadData.phone_number,
            amount: loadData.amount,
            paid: loadData.paid,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch(hideLoading());
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEdit = async (data: any) => {
    const { buyer, phone_number, amount, paid } = data;
    dispatch(showLoading());
    edit(id, buyer, phone_number, amount, paid)
      .then((data) => {
        history.push('/load');
      })
      .catch((err) => {
        console.log(err);
        alert('An error occured');
        dispatch(hideLoading());
      });
  };

  return load ? (
    <div>
      <LoadForm onSubmit={onEdit} preloadedValues={load} />
    </div>
  ) : loading ? (
    <div></div>
  ) : (
    <NotFound />
  );
};
