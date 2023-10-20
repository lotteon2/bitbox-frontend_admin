import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Input, Form } from 'antd';
import Logo from '../../assets/images/logo.png';
import { useFirstLogin } from './FirstLogin.hooks';
import { FieldType } from '../../constants/FieldType';
import Button from '../../components/common/Button';

const FirstLogin = () => {
	const navigate = useNavigate();
	const { isFirstLogin, password, setPassword, checkPassword, setCheckPassword, onFinish, isDisabled } =
		useFirstLogin();

	useEffect(() => {
		if (!isFirstLogin) {
			navigate('/login');
		}
	}, [isFirstLogin, navigate]);

	return (
		<div className="w-full relative flex justify-center items-center ">
			<div
				className="px-32 py-16 border-[1px] rounded-md dark:bg-grayscale7 
	  flex-col items-center text-center justify-center min-w-[400px]"
			>
				<div className="pb-8 flex items-center justify-center">
					<img className="w-[60px]" src={Logo} alt="로고" />
				</div>
				<p className="pb-8 font-regular text-3xl dark:text-grayscale1">초기 비밀번호를 변경해주세요.</p>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600, width: '100%' }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item<FieldType>
						label="비밀번호"
						name="password"
						rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
					>
						<Input.Password value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
					</Form.Item>

					<Form.Item<FieldType>
						label="확인비밀번호"
						name="checkPassword"
						rules={[{ required: true, message: '비밀번호를 한 번 더 입력해주세요' }]}
					>
						<Input.Password value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)} />
					</Form.Item>
					<Button
						content="로그인"
						key="loginAdmin"
						isFull
						handleClick={onFinish}
						htmlType="submit"
						disabled={isDisabled}
					/>
				</Form>
			</div>
		</div>
	);
};
export default FirstLogin;
