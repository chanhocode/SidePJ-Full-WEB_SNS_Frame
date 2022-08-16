import React, { useCallback, useMemo, useState } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const FormWrapper = styled(Form)`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  background-color: #fca3b9;

  & label {
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
  }
  & Input{
    border-radius: 8px;
    margin-top: 5px;
    margin-bottom: 15px;
  }
`;
const ButtonWrapper = styled.div`
  padding-top: 10px;
  text-align: center;
  & Button {
    width: 40%;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  // login dummy
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor='user-email'>이메일</label>
        <br />
        <Input
          name='user-email'
          type='email'
          value={email}
          onChange={onChangeEmail}
          required
          placeholder='e-mail을 입력하세요.'
        />
      </div>
      <div>
        <label htmlFor='user-password'>비밀번호</label>
        <br />
        <Input
          name='user-password'
          type='password'
          value={password}
          onChange={onChangePassword}
          required
          placeholder='password를 입력하세요.'
        />
      </div>
      <ButtonWrapper>
        <Button type='primary' htmlType='submit' loading={logInLoading}>
          로그인
        </Button>
        <Link href='/signup'>
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
