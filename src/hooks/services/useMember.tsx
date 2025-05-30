"use client";

import { authService } from "@/api";
import { JoinForm, LoginData } from "@/types/form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAuth from "../useAuth";

export default function useMember() {
	const router = useRouter();
	const { loginToken } = useAuth();

	const handleLogin = useMutation({
		mutationFn: (obj: LoginData) => authService.login(obj),
		// Mutation이 시작되기 직전에 특정 작업을 수행
		onMutate(a) {
			console.log(a);
		},

		onSuccess({ data }) {
			console.log(data);
			alert("로그인!");
			loginToken(data.access_token, data.refresh_token);
			router.push("/");
		},
		onError(err) {
			console.log(err);
		},
		// 결과에 관계 없이 무언가 실행됨
		onSettled(data, err, params, context) {
			// console.log(data, err, params, context);
		},
	});

	const handleRegister = useMutation({
		mutationFn: (joinForm: JoinForm) => authService.joinMember(joinForm),
		// Mutation이 시작되기 직전에 특정 작업을 수행
		onMutate(a) {
			console.log(a);
		},
		onSuccess({ data }) {
			console.log(data);
			alert("회원가입이 완료되었습니다.");
			router.push("/member");
		},
		onError(err) {
			console.log(err);
		},
		// 결과에 관계 없이 무언가 실행됨
		onSettled(a, b) {
			console.log(a, b);
		},
	});

	const handleIdDuplcheck = useMutation({
		mutationFn: (user_id: string) => authService.idDuplcheck({ user_id }),
		// Mutation이 시작되기 직전에 특정 작업을 수행
		onMutate(a) {
			console.log(a);
		},
		onSuccess({ data }) {
			console.log(data);
		},
		onError(err) {
			console.log(err);
		},
		// 결과에 관계 없이 무언가 실행됨
		onSettled(a, b) {},
	});

	return { handleLogin, handleRegister, handleIdDuplcheck };
}
