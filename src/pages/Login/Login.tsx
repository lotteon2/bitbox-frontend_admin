import { Input, Form } from 'antd';
import Button from '../../components/common/Button';
import Logo from '../../assets/images/logo.png';
import { FieldType } from '../../constants/FieldType';
import { useLogin } from './Login.hooks';

// TODO : 종민 코드 추가
const Login = () => {
	const { email, setEmail, password, setPassword, onFinish, onFinishFailed } = useLogin();

	return (
		<div className="w-full relative flex justify-center items-center ">
			<div
				className="px-32 py-16 border-[1px] rounded-md dark:bg-grayscale7 
	  flex-col items-center text-center justify-center min-w-[400px]"
			>
				<div className="pb-8 flex items-center justify-center">
					<img className="w-[60px]" src={Logo} alt="로고" />
				</div>
				<p className="pb-8 font-regular text-3xl dark:text-grayscale1">관리자로 로그인 하기</p>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600, width: '100%' }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item<FieldType>
						label="이메일"
						name="username"
						rules={[{ required: true, message: '이메일을 입력해주세요' }]}
					>
						<Input value={email} onChange={(e) => setEmail(e.target.value)} />
					</Form.Item>

					<Form.Item<FieldType>
						label="Password"
						name="password"
						rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
					>
						<Input.Password value={password as string} onChange={(e) => setPassword(e.target.value)} />
					</Form.Item>
					<Button content="로그인" key="loginAdmin" isFull handleClick={onFinish} htmlType="submit" />
				</Form>
			</div>
		</div>
	);
};
export default Login;
