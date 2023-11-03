import Swal from 'sweetalert2';

const CustomToast = Swal.mixin({
	toast: true,
	position: 'bottom-start',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer); 
	},
});

export const Toast = (isSuccess: boolean, title: string) => {
	CustomToast.fire({
		title,
		color: '#212B36',
		background: '#FFFFFF',
		iconHtml: isSuccess
			? '<a><img style="width: 80px" src="https://i.ibb.co/Y3dNf6N/success.png" alt="success"></a>'
			: '<a><img style="width: 80px" src="https://i.ibb.co/gFW7m2H/danger.png" alt="danger"></a>',
	});
};
