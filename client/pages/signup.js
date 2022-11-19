import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import AppLayout from '../componets/AppLayout';
import styled from 'styled-components';
import { Button, Checkbox, Form, Input, Calendar } from 'antd';
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
  width: 100%;
  background-color: #5f9df7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 5px;
  & h1 {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;
const BirthArea = styled(Calendar)`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
`;
const AgeAndGenderForm = styled.div`
  margin-top: 5px;
  justify-content: space-between;
  display: flex;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  Input {
    width: 20%;
    margin-right: 10px;
  }
  .genderWrapper {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const PhoneNum = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  .numWrapper {
    width: 100%;
    display: flex;
  }
  select {
    width: 20%;
    height: 30px;
  }
  Input {
    width: 20%;
    height: 30px;
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
  const [name, onChangeName] = useInput('');
  // const [age, onChangeAge] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [term, setTerm] = useState(false);
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('men');
  const [menChecked, setMenChecked] = useState(true);
  const [womenChecked, setWomenChecked] = useState(false);
  const [age, setAge] = useState('');
  const [midNum, setMidNum] = useState('');
  const [lastNum, setLastNum] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onPanelChange = (value, mode) => {
    setBirth(value.format('YYYY-MM-DD'));
  };
  const onBirthSelect = (value, mode) => {
    let birthData = value.format('YYYY-MM-DD');
    setBirth((birthData = value.format('YYYY-MM-DD')));
  };
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const onChangeTerm = (e) => {
    setTerm(e.target.checked);
    setTermError(false);
  };
  const onChangeGender = (e) => {
    if (e.target.value === 'men') {
      setMenChecked(true);
      setWomenChecked(false);
      setGender('men');
    }
    if (e.target.value === 'women') {
      setMenChecked(false);
      setWomenChecked(true);
      setGender('women');
    }
  };
  const onChangeAge = useCallback((e) => {
    setAge(e.target.value);
  });
  const onChangeMidnum = (e) => {
    setMidNum(e.target.value);
  };
  const onChangeLastNum = (e) => {
    setLastNum(e.target.value);
  };

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    const userAge = Number(age);
    const fullNum = '010'.concat(midNum, lastNum);

    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname,
        name,
        birth,
        gender,
        userAge,
        fullNum,
      },
    });
  }, [
    email,
    password,
    passwordCheck,
    term,
    name,
    birth,
    gender,
    age,
    midNum,
    lastNum,
  ]);

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
            width: '50%',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        />
        <h1>Welcome to Sign Up!!</h1>
        <div>
          <InputArea
            name='user-name'
            value={name}
            required
            onChange={onChangeName}
            placeholder='이름을 입력하세요.'
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
          <h3 style={{ color: '#fff' }}>당신의 생일을 선택해주세요.</h3>
        </div>
        <div>
          <BirthArea
            fullscreen={false}
            onPanelChange={onPanelChange}
            onSelect={onBirthSelect}
            style={{ width: '80%' }}
          />
        </div>
        <AgeAndGenderForm>
          <Input
            name='user-age'
            value={age}
            onChange={onChangeAge}
            placeholder='나이'
            required
          />
          <div className='genderWrapper'>
            <Checkbox
              onChange={onChangeGender}
              name='user-gender'
              value='men'
              checked={menChecked}
            >
              남성
            </Checkbox>

            <Checkbox
              onChange={onChangeGender}
              name='user-gender'
              value='women'
              checked={womenChecked}
            >
              여성
            </Checkbox>
          </div>
        </AgeAndGenderForm>
        <PhoneNum>
          <div className='numWrapper'>
            <select name='user-number'>
              <option value='010' selected>
                010
              </option>
            </select>
            {' - '}
            <Input
              name='user-midNum'
              value={midNum}
              onChange={onChangeMidnum}
              maxLength='4'
            />
            {' - '}
            <Input
              name='user-lastNum'
              value={lastNum}
              onChange={onChangeLastNum}
              maxLength='4'
            />
          </div>
        </PhoneNum>
        <div>
          <Checkbox
            name='user-term'
            checked={term}
            onChange={onChangeTerm}
            style={{ color: '#fff', marginTop: '20px', marginBottom: '20px' }}
          >
            {'정보제공의 동의하며 회원가입 하시겠습니까? (필수)'}
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button
            type='primary'
            htmlType='submit'
            loading={signUpLoading}
            style={{ backgroundColor: '#1C6DD0', border: 'none' }}
          >
            가입하기
          </Button>
        </div>
      </FormWrapper>
    </AppLayout>
  );
};

export default signup;
