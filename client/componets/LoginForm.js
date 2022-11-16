import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const FormWrapper = styled(Form)`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #a2a8d3;

  & label {
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
  }
  & Input {
    border-radius: 8px;
    margin-top: 5px;
    margin-bottom: 15px;
  }
`;
const ButtonWrapper = styled.div`
  padding-top: 10px;
  & Button {
    width: 25%;
    border-radius: 20px;
  }
  & a {
    margin-left: 10px;
    color: #fff;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <Row gotter={8}>
        <Col xs={24} md={12}>
          <div style={{ marginRight: 10 }}>
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
        </Col>
        <Col xs={24} md={12}>
          <div style={{ marginRight: 10 }}>
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
        </Col>
        <Col xs={24} md={24}>
          <ButtonWrapper>
            <Button type='primary' htmlType='submit' loading={logInLoading}>
              로그인
            </Button>
            <Link href='/signup'>
              <a>아직 회원이 아니신가요?</a>
            </Link>
          </ButtonWrapper>
        </Col>
      </Row>
    </FormWrapper>
  );
};

export default LoginForm;
