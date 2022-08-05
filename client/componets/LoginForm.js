import React, { useCallback, useMemo, useState } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from 'prop-types';
import useInput from "../hooks/useInput";

const FormWrapper = styled(Form)`
  padding: 10px;
  background-color: azure;
`;

const LoginForm = ({ setIsLoggedIn }) => {
  const style = useMemo(() => ({ marginTop: 10 }), []);

  const [id, onChangeId] = useInput('')
  const [password, onChangePassword] = useInput('');

  // login dummy
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div style={style}>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <button>회원가입</button>
          </a>
        </Link>
      </div>
    </FormWrapper>
  );
};
LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
}
export default LoginForm;
