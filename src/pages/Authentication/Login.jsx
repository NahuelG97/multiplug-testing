// import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import withRouter from "../../components/Common/withRouter";

// //redux
// import { useSelector, useDispatch } from "react-redux";
// import { createSelector } from "reselect";

// // Formik validation
// import * as Yup from "yup";
// import { useFormik } from "formik";

// import {
//   Row,
//   Col,
//   CardBody,
//   Card,
//   Alert,
//   Container,
//   Form,
//   Input,
//   FormFeedback,
//   Label,
// } from "reactstrap";

// // actions
// import { loginUser, socialLogin } from "../../store/actions";

// // import images
// import profile from "../../assets/images/profile-img.png";
// import logo from "../../assets/images/logo.svg";
// import lightlogo from "../../assets/images/logo-light.svg";

// const Login = (props) => {
//   //meta title
//   document.title = "Login | Skote - Vite React Admin & Dashboard Template";
//   const dispatch = useDispatch();

//   const validation = useFormik({
//     // enableReinitialize : use this flag when initial values needs to be changed
//     enableReinitialize: true,

//     initialValues: {
//       email: "admin@themesbrand.com" || "",
//       password: "123456" || "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().required("Please Enter Your Email"),
//       password: Yup.string().required("Please Enter Your Password"),
//     }),
//     onSubmit: (values) => {
//       dispatch(loginUser(values, props.router.navigate));
//     },
//   });

//   const LoginProperties = createSelector(
//     (state) => state.Login,
//     (login) => ({
//       error: login.error
//     })
//   );

//   const {
//     error
//   } = useSelector(LoginProperties);

//   const signIn = type => {
//     dispatch(socialLogin(type, props.router.navigate));
//   };

//   //for facebook and google authentication
//   const socialResponse = type => {
//     signIn(type);
//   };

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
//                     <Col xs={7}>
//                       <div className="text-primary p-4">
//                         <h5 className="text-primary">Welcome Back !</h5>
//                         <p>Sign in to continue to Skote.</p>
//                       </div>
//                     </Col>
//                     <Col className="col-5 align-self-end">
//                       <img src={profile} alt="" className="img-fluid" />
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
//                       {error ? <Alert color="danger">{error}</Alert> : null}

//                       <div className="mb-3">
//                         <Label className="form-label">Email</Label>
//                         <Input
//                           name="email"
//                           className="form-control"
//                           placeholder="Enter email"
//                           type="email"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           value={validation.values.email || ""}
//                           invalid={
//                             validation.touched.email && validation.errors.email
//                               ? true
//                               : false
//                           }
//                         />
//                         {validation.touched.email && validation.errors.email ? (
//                           <FormFeedback type="invalid">
//                             {validation.errors.email}
//                           </FormFeedback>
//                         ) : null}
//                       </div>

//                       <div className="mb-3">
//                         <Label className="form-label">Password</Label>
//                         <Input
//                           name="password"
//                           autoComplete="off"
//                           value={validation.values.password || ""}
//                           type="password"
//                           placeholder="Enter Password"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           invalid={
//                             validation.touched.password &&
//                               validation.errors.password
//                               ? true
//                               : false
//                           }
//                         />
//                         {validation.touched.password &&
//                           validation.errors.password ? (
//                           <FormFeedback type="invalid">
//                             {validation.errors.password}
//                           </FormFeedback>
//                         ) : null}
//                       </div>

//                       <div className="form-check">
//                         <input
//                           type="checkbox"
//                           className="form-check-input"
//                           id="customControlInline"
//                         />
//                         <label
//                           className="form-check-label"
//                           htmlFor="customControlInline"
//                         >
//                           Remember me
//                         </label>
//                       </div>

//                       <div className="mt-3 d-grid">
//                         <button
//                           className="btn btn-primary btn-block"
//                           type="submit"
//                         >
//                           Log In
//                         </button>
//                       </div>

//                       <div className="mt-4 text-center">
//                         <h5 className="font-size-14 mb-3">Sign in with</h5>

//                         <ul className="list-inline">
//                           <li className="list-inline-item">
//                             <Link
//                               to="#"
//                               className="social-list-item bg-primary text-white border-primary"
//                               onClick={e => {
//                                 e.preventDefault();
//                                 socialResponse("facebook");
//                               }}
//                             >
//                               <i className="mdi mdi-facebook" />
//                             </Link>
//                           </li>
//                           {/*<li className="list-inline-item">*/}
//                           {/*  <TwitterLogin*/}
//                           {/*    loginUrl={*/}
//                           {/*      "http://localhost:4000/api/v1/auth/twitter"*/}
//                           {/*    }*/}
//                           {/*    onSuccess={this.twitterResponse}*/}
//                           {/*    onFailure={this.onFailure}*/}
//                           {/*    requestTokenUrl={*/}
//                           {/*      "http://localhost:4000/api/v1/auth/twitter/revers"*/}
//                           {/*    }*/}
//                           {/*    showIcon={false}*/}
//                           {/*    tag={"div"}*/}
//                           {/*  >*/}
//                           {/*    <a*/}
//                           {/*      href=""*/}
//                           {/*      className="social-list-item bg-info text-white border-info"*/}
//                           {/*    >*/}
//                           {/*      <i className="mdi mdi-twitter"/>*/}
//                           {/*    </a>*/}
//                           {/*  </TwitterLogin>*/}
//                           {/*</li>*/}
//                           <li className="list-inline-item">
//                             <Link
//                               to="#"
//                               className="social-list-item bg-danger text-white border-danger"
//                               onClick={e => {
//                                 e.preventDefault();
//                                 socialResponse("google");
//                               }}
//                             >
//                               <i className="mdi mdi-google" />
//                             </Link>
//                           </li>
//                         </ul>
//                       </div>

//                       <div className="mt-4 text-center">
//                         <Link to="/forgot-password" className="text-muted">
//                           <i className="mdi mdi-lock me-1" />
//                           Forgot your password?
//                         </Link>
//                       </div>
//                     </Form>
//                   </div>
//                 </CardBody>
//               </Card>
//               <div className="mt-5 text-center">
//                 <p>
//                   Don&#39;t have an account ?{" "}
//                   <Link to="/register" className="fw-medium text-primary">
//                     {" "}
//                     Signup now{" "}
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

// export default withRouter(Login);

// Login.propTypes = {
//   history: PropTypes.object,
// };










import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";
import { loginUser, socialLogin } from "../../store/actions";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const Login = (props) => {
  document.title = "Login | Skote - Vite React Admin & Dashboard Template";
  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "admin@themesbrand.com",
      password: "123456",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    },
  });

  const LoginProperties = createSelector(
    (state) => state.Login,
    (login) => ({
      error: login.error
    })
  );

  const { error } = useSelector(LoginProperties);

  const signIn = type => {
    dispatch(socialLogin(type, props.router.navigate));
  };

  const socialResponse = type => {
    signIn(type);
  };

  const [passwordShow, setPasswordShow] = useState(false);

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
                        <img src={logoDark} alt="" height="18" className="auth-logo-dark" />
                        <img src={logoLight} alt="" height="18" className="auth-logo-light" />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p className="text-muted">Sign in to continue to Skote.</p>
                      </div>
                      <div className="mt-4">
                        <Form className="form-horizontal" onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }}>
                          {error ? <Alert color="danger">{error}</Alert> : null}

                          <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={validation.touched.email && validation.errors.email ? true : false}
                            />
                            {validation.touched.email && validation.errors.email ? (
                              <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                            ) : null}
                          </div>



                          <div className="mb-3">
                            <div className="float-end">
                              <Link to="/forgot-password" className="text-muted">
                                <i className="mdi mdi-lock me-1" />
                                Forgot your password?
                              </Link>
                            </div>
                            <Label className="form-label">Password</Label>
                            <div className="input-group auth-pass-inputgroup">
                              <Input
                                name="password"
                                value={validation.values.password || ""}
                                type={passwordShow ? "text" : "password"}
                                placeholder="Enter Password"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                invalid={validation.touched.password && validation.errors.password ? true : false}
                              />
                              <button onClick={() => setPasswordShow(!passwordShow)} className="btn btn-light" type="button" id="password-addon">
                                <i className="mdi mdi-eye-outline"></i>
                              </button>
                            </div>


                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                          </div>
                          {/* <div className="form-check">
                            <Input type="checkbox" className="form-check-input" id="auth-remember-check" />
                            <label className="form-check-label" htmlFor="auth-remember-check">Remember me</label>
                          </div> */}
                          <div className="mt-3 d-grid">
                            <button className="btn btn-primary btn-block" type="submit">Log In</button>
                          </div>
                        </Form>
                        <div className="mt-4 text-center">
                          <h5 className="font-size-14 mb-3">Sign in with</h5>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <Link to="#" className="social-list-item bg-primary text-white border-primary me-1" onClick={(e) => { e.preventDefault(); socialResponse("facebook"); }}>
                                <i className="mdi mdi-facebook"></i>
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link to="#" className="social-list-item bg-info text-white border-info me-1" onClick={(e) => { e.preventDefault(); socialResponse("twitter"); }}>
                                <i className="mdi mdi-twitter"></i>
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link to="#" className="social-list-item bg-danger text-white border-danger" onClick={(e) => { e.preventDefault(); socialResponse("google"); }}>
                                <i className="mdi mdi-google"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="mt-5 text-center">
                          <p>Don't have an account ? <Link to="/register" className="fw-medium text-primary">Signup now</Link></p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">© {new Date().getFullYear()}. Crafted with <i className="mdi mdi-heart text-danger"></i> by <a href="http://cognition.com.ar" target="_blank" rel="noopener noreferrer">Cognition</a> </p>
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
export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
