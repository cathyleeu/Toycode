import React from 'react'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import BranchSignUp from '../components/BranchSignUp'
import KinderSignUp from '../components/KinderSignUp'

const SignUp = () => (
  <Tabs>
    <Tab title="지사/본사 회원가입">
      <BranchSignUp />
    </Tab>
    <Tab title="원(선생님) 회원가입">
      <KinderSignUp />
    </Tab>
  </Tabs>
)

export default SignUp;
