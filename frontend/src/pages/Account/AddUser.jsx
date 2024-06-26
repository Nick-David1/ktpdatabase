import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

const backend = import.meta.env.VITE_BACKEND_URL;

const AddUser = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const getUser = useCallback(async () => {
        try {
            const response = await axios.get(
                `${backend}/auth/google/login/success`,
                {
                    withCredentials: true,
                }
            );
            if (!response.data.user.is_admin) {
                navigate("/error/admin");
            }
        } catch (error) {
            navigate("/error/login");
        }
    }, [navigate]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const addUserForm = useForm({
        defaultValues: {
            first: "",
            last: "",
            bu_email: "",
            class: "",
            is_admin: "false",
        },
    });

    const handleUserReset = () => {
        reset({
            first: "",
            last: "",
            bu_email: "",
            class: "",
            is_admin: "false",
        });
    };

    const { register, handleSubmit, reset, formState } = addUserForm;

    const { errors } = formState;

    const onSubmit = (data) => {
        const userObj = {
            ...data,
            bu_email: data.bu_email.toLowerCase(),
            is_admin: data.is_admin === "true",
        };
        console.log("Form submitted", userObj);
        axios
            .post(`${backend}/account/admin/add-user`, userObj)
            .then(() => {
                console.log(userObj);
                enqueueSnackbar("Added user successfully", {
                    variant: "success",
                });
                handleUserReset();
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    enqueueSnackbar("User already exists", { variant: "info" });
                } else {
                    enqueueSnackbar("Failed to add user", { variant: "error" });
                    console.log(error);
                }
            });
    };

    const onError = (errors) => {
        console.log("Form errors", errors);
    };

    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="text-start p-3">Add User</h2>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/account/admin">Admin</Breadcrumb.Item>
                <Breadcrumb.Item href="/account/admin/users">
                    Manage Users
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Add User</Breadcrumb.Item>
            </Breadcrumb>{" "}
            <form
                className="w-fit m-auto px-12 py-4 border-2 border-black"
                onSubmit={handleSubmit(onSubmit, onError)}
                noValidate
            >
                <div className="w-fit mx-auto flex flex-col">
                    <label className="w-fit text-left text-xl" htmlFor="first">
                        First Name
                    </label>
                    <input
                        className="w-64 mt-2 px-2 py-1 border-2 border-gray-200 rounded-md"
                        type="text"
                        id="first"
                        placeholder="First name"
                        {...register("first", {
                            required: {
                                value: true,
                                message: "First name is required",
                            },
                        })}
                    />
                    <p className="my-2 text-red-500">{errors.first?.message}</p>
                </div>
                <div className="w-fit mx-auto flex flex-col">
                    <label className="w-fit text-left text-xl" htmlFor="last">
                        Last Name
                    </label>
                    <input
                        className="w-64 mt-2 px-2 py-1 border-2 border-gray-200 rounded-md"
                        type="text"
                        id="last"
                        placeholder="Last name"
                        {...register("last", {
                            required: {
                                value: true,
                                message: "Last name is required",
                            },
                        })}
                    />
                    <p className="my-2 text-red-500">{errors.last?.message}</p>
                </div>
                <div className="w-fit mx-auto flex flex-col">
                    <label
                        className="w-fit text-left text-xl"
                        htmlFor="bu_email"
                    >
                        BU Email
                    </label>
                    <input
                        className="w-64 mt-2 px-2 py-1 border-2 border-gray-200 rounded-md"
                        type="text"
                        id="bu_email"
                        placeholder="Enter email"
                        {...register("bu_email", {
                            required: {
                                value: true,
                                message: "BU email is required",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    <p className="my-2 text-red-500">
                        {errors.bu_email?.message}
                    </p>
                </div>
                <div className="w-fit mx-auto flex flex-col">
                    <label className="w-fit text-left text-xl" htmlFor="class">
                        Pledge Class
                    </label>
                    <select
                        className="w-64 mt-2 px-2 py-1 border-2 border-gray-200 rounded-md"
                        type="text"
                        id="class"
                        {...register("class", {
                            required: {
                                value: true,
                                message: "Pledge class is required",
                            },
                        })}
                    >
                        <option value="">Select...</option>
                        <option value={"Founder"}>Founder</option>
                        <option value={"Alpha"}>Alpha</option>
                        <option value={"Beta"}>Beta</option>
                        <option value={"Gamma"}>Gamma</option>
                    </select>
                    <p className="error text-red-500">
                        {errors.class?.message}
                    </p>
                </div>
                <div className="w-fit mx-auto flex flex-col">
                    <label
                        className="w-fit text-left text-xl"
                        htmlFor="is_admin"
                    >
                        Is Admin
                    </label>
                    <select
                        className="w-64 mt-2 px-2 py-1 border-2 border-gray-200 rounded-md"
                        type="text"
                        id="is_admin"
                        {...register("is_admin", {
                            required: {
                                value: true,
                                message: "Is Admin is required",
                            },
                        })}
                    >
                        <option value="">Select...</option>
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                    </select>
                    <p className="error text-red-500">
                        {errors.is_admin?.message}
                    </p>
                </div>
                <button className="my-2 p-2 text-xl border-2 border-solid ${ hover:border-black rounded-3xl">
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUser;
