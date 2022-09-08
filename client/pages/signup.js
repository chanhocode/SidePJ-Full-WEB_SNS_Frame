import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import AppLayout from '../componets/AppLayout';
import styled from 'styled-components';
import { Button, Checkbox, Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

const ErrorMessage = styled.div`
  color: red;
`;
const InputArea = styled(Input)`
  border-radius: 3px;
  width: 80%;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const FormWrapper = styled(Form)`
  width: 95%;
  background-color: #38598b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 5px;
  & h1 {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);
  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);
  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>Sign UP</title>
      </Head>
      <FormWrapper onFinish={onSubmit}>
        <img
          src='/img/signup.png'
          alt='sign'
          style={{
            width: '70%',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        />
        <h1>Welcome to Sign Up!!</h1>
        <div>
          <InputArea
            name='user-email'
            type='email'
            value={email}
            required
            onChange={onChangeEmail}
            placeholder='e-mail을 입력하세요. ex) abc@email.com'
          />
        </div>
        <div>
          <InputArea
            name='user-nick'
            value={nickname}
            required
            onChange={onChangeNickname}
            placeholder='Nick Name을 입력하세요.'
          />
        </div>
        <div>
          <InputArea
            name='user-password'
            type='password'
            value={password}
            required
            onChange={onChangePassword}
            placeholder='password를 입력하세요.'
          />
        </div>
        <div>
          <InputArea
            name='user-password-check'
            type='password'
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
            placeholder='동일한 password를 다시 입력하세요'
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox
            name='user-term'
            checked={term}
            onChange={onChangeTerm}
            style={{ color: '#fff', marginTop: '20px', marginBottom: '20px' }}
          >
            정말로 회원가입 하시겠습니까?
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button
            type='primary'
            htmlType='submit'
            loading={signUpLoading}
            style={{ backgroundColor: '#A2A8D3', border: 'none' }}
          >
            가입하기
          </Button>
        </div>
      </FormWrapper>
    </AppLayout>
  );
};

export default signup;
