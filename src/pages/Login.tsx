import Button from '../components/common/Button';
import Logo from '../assets/images/logo.png';

// TODO : 종민 코드 추가
const Login = () => {
	return (
		<div className="w-full relative">
			<div className="w-[50%] mx-auto pt-20 min-w-[400px]">
				<div
					className="px-32 py-16 border-[1px] rounded-md dark:bg-grayscale7 
	  flex-col items-center text-center justify-center min-w-[400px]"
				>
					<div className="pb-8 flex items-center justify-center">
						<img className="w-[60px]" src={Logo} alt="로고" />
					</div>
					<p className="pb-8 font-regular text-3xl dark:text-grayscale1">관리자로 로그인 하기</p>
					<Button content="로그인" key="loginAdmin" />
				</div>
			</div>
		</div>
	);
};
export default Login;
