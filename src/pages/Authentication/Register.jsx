// import React, { useEffect } from "react";
// import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// // Formik Validation
// import * as Yup from "yup";
// import { useFormik } from "formik";

// // action
// import { registerUser, apiError } from "../../store/actions";

// //redux
// import { useSelector, useDispatch } from "react-redux";
// import { createSelector } from "reselect";

// import { Link } from "react-router-dom";

// // import images
// import profileImg from "../../assets/images/profile-img.png";
// import logo from "../../assets/images/logo.svg";
// import lightlogo from "../../assets/images/logo-light.svg";

// const Register = () => {
//   document.title = "Register | Skote - Vite React Admin & Dashboard Template";

//   const dispatch = useDispatch();

//   const validation = useFormik({
//     // enableReinitialize : use this flag when initial values needs to be changed
//     enableReinitialize: true,

//     initialValues: {
//       email: '',
//       username: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().required("Please Enter Your Email"),
//       username: Yup.string().required("Please Enter Your Username"),
//       password: Yup.string().required("Please Enter Your Password"),
//     }),
//     onSubmit: (values) => {
//       dispatch(registerUser(values));
//     }
//   });

//   const AccountProperties = createSelector(
//     (state) => state.Account,
//     (account) => ({
//       user: account.user,
//       registrationError: account.registrationError,
//       // loading: account.loading,
//     })
//   );

//   const {
//     user,
//     registrationError,
//     // loading
//   } = useSelector(AccountProperties);

//   useEffect(() => {
//     dispatch(apiError(""));
//   }, []);

//   return (
//     <React.Fragment>

//       <div className="home-btn d-none d-sm-block">
//         <Link to="/" className="text-dark">
//           <i className="bx bx-home h2" />
//         </Link>
//       </div>
//       <div className="account-pages my-5 pt-sm-5">
//         <Container>
//           <Row className="justify-content-center">
//             <Col md={8} lg={6} xl={5}>
//               <Card className="overflow-hidden">
//                 <div className="bg-primary-subtle">
//                   <Row>
//                     <Col className="col-7">
//                       <div className="text-primary p-4">
//                         <h5 className="text-primary">Free Register</h5>
//                         <p>Get your free Skote account now.</p>
//                       </div>
//                     </Col>
//                     <Col className="col-5 align-self-end">
//                       <img src={profileImg} alt="" className="img-fluid" />
//                     </Col>
//                   </Row>
//                 </div>
//                 <CardBody className="pt-0">
//                   <div className="auth-logo">
//                     <Link to="/" className="auth-logo-light">
//                       <div className="avatar-md profile-user-wid mb-4">
//                         <span className="avatar-title rounded-circle bg-light">
//                           <img
//                             src={lightlogo}
//                             alt=""
//                             className="rounded-circle"
//                             height="34"
//                           />
//                         </span>
//                       </div>
//                     </Link>
//                     <Link to="/" className="auth-logo-dark">
//                       <div className="avatar-md profile-user-wid mb-4">
//                         <span className="avatar-title rounded-circle bg-light">
//                           <img
//                             src={logo}
//                             alt=""
//                             className="rounded-circle"
//                             height="34"
//                           />
//                         </span>
//                       </div>
//                     </Link>
//                   </div>
//                   <div className="p-2">
//                     <Form
//                       className="form-horizontal"
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         validation.handleSubmit();
//                         return false;
//                       }}
//                     >
//                       {user && user ? (
//                         <Alert color="success">
//                           Register User Successfully
//                         </Alert>
//                       ) : null}

//                       {registrationError && registrationError ? (
//                         <Alert color="danger">{registrationError}</Alert>
//                       ) : null}

//                       <div className="mb-3">
//                         <Label className="form-label">Email</Label>
//                         <Input
//                           id="email"
//                           name="email"
//                           className="form-control"
//                           placeholder="Enter email"
//                           type="email"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           value={validation.values.email || ""}
//                           invalid={
//                             validation.touched.email && validation.errors.email ? true : false
//                           }
//                         />
//                         {validation.touched.email && validation.errors.email ? (
//                           <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
//                         ) : null}
//                       </div>

//                       <div className="mb-3">
//                         <Label className="form-label">Username</Label>
//                         <Input
//                           name="username"
//                           type="text"
//                           placeholder="Enter username"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           value={validation.values.username || ""}
//                           invalid={
//                             validation.touched.username && validation.errors.username ? true : false
//                           }
//                         />
//                         {validation.touched.username && validation.errors.username ? (
//                           <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
//                         ) : null}
//                       </div>
//                       <div className="mb-3">
//                         <Label className="form-label">Password</Label>
//                         <Input
//                           name="password"
//                           type="password"
//                           placeholder="Enter Password"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           value={validation.values.password || ""}
//                           invalid={
//                             validation.touched.password && validation.errors.password ? true : false
//                           }
//                         />
//                         {validation.touched.password && validation.errors.password ? (
//                           <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
//                         ) : null}
//                       </div>

//                       <div className="mt-4">
//                         <button
//                           className="btn btn-primary btn-block "
//                           type="submit"
//                         >
//                           Register
//                         </button>
//                       </div>

//                       <div className="mt-4 text-center">
//                         <p className="mb-0">
//                           By registering you agree to the Skote{" "}
//                           <Link to="#" className="text-primary">
//                             Terms of Use
//                           </Link>
//                         </p>
//                       </div>
//                     </Form>
//                   </div>
//                 </CardBody>
//               </Card>
//               <div className="mt-5 text-center">
//                 <p>
//                   Already have an account ?{" "}
//                   <Link to="/login" className="font-weight-medium text-primary">
//                     {" "}
//                     Login
//                   </Link>{" "}
//                 </p>
//                 <p>
//                   © {new Date().getFullYear()} Skote. Crafted with{" "}
//                   <i className="mdi mdi-heart text-danger" /> by Themesbrand
//                 </p>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Register;


import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, FormFeedback, Input, Label, Row, Alert } from "reactstrap";
import CarouselPage from "../AuthenticationInner/CarouselPage";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions";

// redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

const Register = () => {
  document.title = "Register | Skote - Vite React Admin & Dashboard Template";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize: use this flag when initial values need to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    }
  });

  const AccountProperties = createSelector(
    (state) => state.Account,
    (account) => ({
      user: account.user,
      registrationError: account.registrationError,
      // loading: account.loading,
    })
  );

  const {
    user,
    registrationError,
    // loading
  } = useSelector(AccountProperties);

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="/" className="d-block auth-logo">
                        <img
                          src={logoDark}
                          alt=""
                          height="18"
                          className="auth-logo-dark"
                        />
                        <img
                          src={logoLight}
                          alt=""
                          height="18"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Register account</h5>
                        <p className="text-muted">
                          Get your free Skote account now.
                        </p>
                      </div>

                      <div className="mt-4">
                        <Form className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          {user && user ? (
                            <Alert color="success">
                              Register User Successfully
                            </Alert>
                          ) : null}

                          {registrationError && registrationError ? (
                            <Alert color="danger">{registrationError}</Alert>
                          ) : null}

                          <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email && validation.errors.email ? true : false
                              }
                            />
                            {validation.touched.email && validation.errors.email ? (
                              <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Username</Label>
                            <Input
                              name="username"
                              type="text"
                              placeholder="Enter username"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.username || ""}
                              invalid={
                                validation.touched.username && validation.errors.username ? true : false
                              }
                            />
                            {validation.touched.username && validation.errors.username ? (
                              <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              type="password"
                              placeholder="Enter password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password && validation.errors.password ? true : false
                              }
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                          </div>

                          <div>
                            <p className="mb-0">
                              By registering you agree to the Skote{" "}
                              <Link to="#" className="text-primary">
                                Terms of Use
                              </Link>
                            </p>
                          </div>

                          <div className="mt-4 d-grid">
                            <button
                              className="btn btn-primary waves-effect waves-light "
                              type="submit"
                            >
                              Register
                            </button>
                          </div>
                        </Form>

                        <Form action="dashboard">
                          <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">Sign up using</h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary me-1"
                                >
                                  <i className="mdi mdi-facebook"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-info text-white border-info me-1"
                                >
                                  <i className="mdi mdi-twitter"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                >
                                  <i className="mdi mdi-google"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Form>

                        <div className="mt-5 text-center">
                          <p>
                            Already have an account ?{" "}
                            <Link
                              to="/login"
                              className="fw-medium text-primary"
                            >
                              {" "}
                              Login
                            </Link>{" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} Skote. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
