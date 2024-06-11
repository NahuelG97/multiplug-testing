import React, { useEffect, useRef, useState } from "react";
//import AgGridDataTable from '../../../components/Common/AgGridDataTable';
import AgGridDataTable from '../../../components/Common/AgGridDataTable/AgGridDataTableFloatingFilters';
import { Link, useLocation } from "react-router-dom";
import { isEmpty } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    Label,
    Card,
    CardBody,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody,
    CardTitle,
    Container
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Spinners from "../../../components/Common/Spinner";
import { ToastContainer } from "react-toastify";
import {
    getJobList as onGetJobList,
    addNewJobList as onAddNewJobList,
    updateJobList as onUpdateJobList,
    deleteJobList as onDeleteJobList,
} from "../../../store/actions";
import SimplePie from "../../../components/Common/AgChartsDataGraphic/Pie/SimplePie";

interface OriginalItem {
    NOMBRE: string;
    TIPO: string;
    VALOR: string;
}


const Queries = () => {
    document.title = "Jobs List | Skote - Vite React Admin & Dashboard Template";

    const [modal, setModal] = useState(false);
    const [modalGraphic, setModalGraphic] = useState(false);
    const [data, setData] = useState<any | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [renderingAgGridComponent, setrenderingAgGridComponent] = useState<JSX.Element | null>(null);
    const gridApiRef = useRef<any>(null);
    const url = window.location.href;
    const [id, setId] = useState<any | null>(null);
    const [nameQuery, setNameQuery] = useState<any | null>(null);
    const [filterInfo, setfilterInfo] = useState<any | null>(null);
    const [shouldUpdate, setShouldUpdate] = useState(false); // Nuevo estado para controlar la actualización automática
    const [updatedFilters, setupdatedFilters] = useState<any | null>(null);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {},
        validationSchema: Yup.object({
            // Definir las validaciones
        }),
        onSubmit: (values) => {
            // Lógica para enviar los datos del formulario
        },
    });

    const dispatch = useDispatch();

    const JobsJobsProperties = createSelector(
        (state) => state.JobReducer,
        (jobReducer) => ({
            jobs: jobReducer.jobs,
            loading: jobReducer.loading
        })
    );

    const { jobs, loading } = useSelector(JobsJobsProperties);
    const [isLoading, setLoading] = useState(loading);

    useEffect(() => {
        if (jobs && !jobs.length) {
            dispatch(onGetJobList());
        }
    }, [dispatch, jobs]);

    useEffect(() => {
        if (!isEmpty(jobs) && !!isEdit) {
            setIsEdit(false);
        }
    }, [jobs]);

    const toggle = () => {
        setModal(!modal);
    };

    const toggleGraphic = () => {
        setModalGraphic(!modalGraphic);
    };

    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };


    const loadFilter = () => {
        setLoading(true);
        const id = url.substr(url.lastIndexOf('/') + 1);
        console.log(id);
        setId(id);
        const fetchData = async () => {
            const response = await fetch(`https://ypsresttest.azurewebsites.net/service1.svc/getQuery/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
            });

            if (response.ok) {

                const responseData = await response.json(); // Convierte el cuerpo de la respuesta a JSON
                console.log("responseData ", responseData);
                if (responseData) {
                    setNameQuery(responseData.NOMBRE);
                    if (responseData.PARAMETROS) {
                        const Data = responseData.PARAMETROS;
                        const Filters = JSON.parse(Data);
                        console.log("PARAMETROS", Filters);
                        setfilterInfo(Filters);
                        setLoading(false);
                    }
                }

            } else {
                throw new Error('La solicitud no pudo completarse.');
            }
        }
        fetchData();
    };

    const FormContent = () => {
        return (
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                }}
            >
                <Row>
                    <Col className="col-12">
                        <div className="mb-3">
                            <Label className="form-label"> Job Id</Label>
                            <Input
                                name="jobId"
                                type="text"
                                placeholder="Insert Job Id"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value=""
                            />
                        </div>
                        {/* Repite el resto de los campos del formulario aquí */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="text-end">
                            <Button type="submit" className="btn btn-success save-user">
                                Save
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        );
    };

    const ContentGraphic = () => {
        function getDataPie() {
             // Transforma los datos al formato esperado por el componente SimplePie
             const transformedData = data.map(item => ({
                asset: item.ITEMS,
                amount: item.CANTIDAD
            }));

            return transformedData;
        }

        const dataPie = getDataPie();
        console.log("Data", data);
    
        return (
            <React.Fragment>
                <div className="page-content">
                    <div className="container-fluid" style={{ height: '400px', width: 'auto'}}>
                        <SimplePie data={dataPie} title="Portfolio Composition" subtitle="" />
                    </div>
                </div>
            </React.Fragment>
        );
    };

    const confirmSelectedDelete = (selectedRows: any) => {
        var selectedRecordsId = selectedRows.map((item: any) => {
            console.log(item);
            const valor = item.IMAGENID; // Acceder directamente al valor del elemento de la matriz
            return valor;
        });
        //setSelectedRows(selectedRecordsId);
    };

    // Componente funcional
    const MyComponentAgGrid: React.FC<any> = ({ entityResponseArray }) => {
        return (
            <div>
                <AgGridDataTable data={entityResponseArray} rowsSelected={confirmSelectedDelete} gridApiRef={gridApiRef} />
            </div>
        );
    }

    function createObject() {
        var Filters;
        console.log("updatedFilters", updatedFilters);
        if (!updatedFilters) {
            console.log("updatedFilters esta vacio");
            Filters = filterInfo.map((item: OriginalItem) => {

                return {
                    Nombre: item.NOMBRE,
                    Tipo: item.TIPO,
                    Valor: item.TIPO === 'COMBO' ? 'TODAS' : (item.TIPO === 'FECHA' ? null : (item.VALOR || ''))
                };
            });
        }
        else Filters = updatedFilters;

        console.log(Filters);


        var objQuery = {
            QUERYID: id,
            USERID: "0fbd4533-b9f1-47df-a33c-c6c0a2bc366c",
            PARAMETERS: Filters,
            PAGE: 1,
            PAGINATE: true
        }

        console.log(JSON.stringify(objQuery));
        return JSON.stringify(objQuery);
    }

    const loadAgGrid = () => {

        const fetchData = async () => {
            const response = await fetch('https://ypsresttest.azurewebsites.net/service1.svc/executequeryparameter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: await createObject(),
            });

            if (response.ok) {

                const responseData = await response.json(); // Convierte el cuerpo de la respuesta a JSON
                console.log("responseData ", responseData);
                if (responseData.Code == 200) {

                    if (responseData.EntityResponse) {
                        const Data = responseData.EntityResponse;
                        console.log("Data ", Data);
                        setData(Data);

                        setrenderingAgGridComponent(<MyComponentAgGrid entityResponseArray={Data} rowsSelected={confirmSelectedDelete} />);
                    }
                }
                setLoading(false);
            } else {
                throw new Error('La solicitud no pudo completarse.');
            }
        }

        fetchData();
    };

    // Obtener la ubicación actual del navegador
    const location = useLocation();

    useEffect(() => {

        setLoading(true);
        localStorage.removeItem('formFilterValues');
        setrenderingAgGridComponent(<MyComponentAgGrid entityResponseArray={null} />);
        loadFilter();
        setTimeout(() => {
            setLoading(false); // Establece el estado de carga en falso después de 500ms
        }, 500);
    }, [location]);

    useEffect(() => {
        // Este efecto se ejecutará cada vez que shouldUpdate cambie
        if (shouldUpdate) {
            setLoading(true);
            loadAgGrid();
            setShouldUpdate(false); // Restablecer shouldUpdate para evitar múltiples actualizaciones automáticas
        }
    }, [shouldUpdate]);



    // // Guardar la ubicación anterior para compararla con la actual
    // const prevLocationRef = useRef(location);

    // useEffect(() => {
    //     // // Verificar si la ubicación actual es diferente a la anterior
    //     // if (prevLocationRef.current.pathname !== location.pathname) {
    //     //     // Si es diferente, recargar la página
    //     //     window.location.reload();
    //     // }

    //     // // Actualizar la ubicación anterior
    //     // prevLocationRef.current = location;
    // }, [location]);


    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Consultas" breadcrumbItem={nameQuery} />
                    {isLoading ? (
                        <Spinners setLoading={setLoading} />
                    ) : (
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody className="border-bottom">
                                        <div className="d-flex align-items-center">
                                            <h5 className="mb-0 card-title flex-grow-1"></h5>
                                            <div className="flex-shrink-0">
                                                <Button
                                                    onClick={toggleRightCanvas}
                                                    className="btn btn-primary me-1"
                                                >
                                                    Filters
                                                </Button>
                                                <Button
                                                    className="btn btn-light me-1"
                                                    onClick={loadAgGrid}>
                                                    <i className="mdi mdi-refresh"></i>
                                                </Button>
                                                <UncontrolledDropdown className="dropdown d-inline-block me-1">
                                                    <DropdownToggle
                                                        type="menu"
                                                        className="btn btn-secondary"
                                                        id="dropdownMenuButton1">
                                                        <i className="mdi mdi-dots-vertical"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li>
                                                            <DropdownItem>New</DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem>Update</DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem>Delete</DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem onClick={toggleGraphic}>Graphic</DropdownItem>
                                                        </li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </CardBody>
                                    <CardBody>
                                        <div>
                                            {renderingAgGridComponent}
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
            <ToastContainer />
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} tag="h4">
                    {!!isEdit ? "Edit Job" : "Add Job"}
                </ModalHeader>
                <ModalBody>
                    {modal && <FormContent />}
                </ModalBody>
            </Modal>

            {data && (
            <Modal isOpen={modalGraphic} toggle={toggleGraphic}>
                <ModalHeader toggle={toggleGraphic} tag="h4">
                    {"Graphic"}
                </ModalHeader>
                <ModalBody>
                    {modalGraphic && <ContentGraphic />}
                </ModalBody>
            </Modal>)}


            <Offcanvas
                isOpen={isRight}
                direction="end"
                toggle={toggleRightCanvas}
            >
                <OffcanvasHeader toggle={toggleRightCanvas}>
                    Filtros
                </OffcanvasHeader>
                <OffcanvasBody>
                    <Container fluid={true}>
                        <Card>
                            <CardBody>
                                <CardTitle className="h4">Opciones</CardTitle>
                                <hr />
                                {[
                                    { id: 'text', label: 'Text', type: 'text', defaultValue: 'Artisanal kale' },
                                    { id: 'search', label: 'Search', type: 'search', defaultValue: 'How do I shoot web' },
                                    { id: 'email', label: 'Email', type: 'email', defaultValue: 'bootstrap@example.com' },
                                    { id: 'url', label: 'URL', type: 'url', defaultValue: 'https://getbootstrap.com' },
                                    { id: 'tel', label: 'Telephone', type: 'tel', defaultValue: '1-(555)-555-5555' },
                                    { id: 'password', label: 'Password', type: 'password', defaultValue: 'hunter2' },
                                    { id: 'number', label: 'Number', type: 'number', defaultValue: '42' },
                                    { id: 'datetime-local', label: 'Date and time', type: 'datetime-local', defaultValue: '2019-08-19T13:45:00' },
                                    { id: 'date', label: 'Date', type: 'date', defaultValue: '2019-08-19' },
                                    { id: 'month', label: 'Month', type: 'month', defaultValue: '2019-08' },
                                    { id: 'week', label: 'Week', type: 'week', defaultValue: '2019-W33' },
                                    { id: 'time', label: 'Time', type: 'time', defaultValue: '13:45:00' },
                                    { id: 'color', label: 'Color', type: 'color', defaultValue: '#556ee6', extraClass: 'form-control-color mw-100' },
                                ].map(input => (
                                    <Row className="mb-3" key={input.id}>
                                        <Col md="12">
                                            <Label htmlFor={`example-${input.id}-input`} className="form-label">
                                                {input.label}
                                            </Label>
                                            <Input
                                                className={`form-control ${input.extraClass || ''}`}
                                                type={input.type as any}
                                                defaultValue={input.defaultValue}
                                                id={`example-${input.id}-input`}
                                            />
                                        </Col>
                                    </Row>
                                ))}
                                <Row className="mb-3">
                                    <Col md="12">
                                        <Label htmlFor="example-select-input" className="form-label">
                                            Select
                                        </Label>
                                        <Input
                                            type="select"
                                            className="form-control"
                                            id="example-select-input"
                                        >
                                            <option>Select</option>
                                            <option>Large select</option>
                                            <option>Small select</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <Label htmlFor="exampleDataList" className="form-label">
                                            Datalists
                                        </Label>
                                        <Input
                                            className="form-control"
                                            list="datalistOptions"
                                            id="exampleDataList"
                                            placeholder="Type to search..."
                                        />
                                        <datalist id="datalistOptions">
                                            <option value="San Francisco" />
                                            <option value="New York" />
                                            <option value="Seattle" />
                                            <option value="Los Angeles" />
                                            <option value="Chicago" />
                                        </datalist>
                                    </Col>
                                </Row>
                            </CardBody>
                            <Button color="secondary" onClick={toggleRightCanvas}>
                                Aplicar filtros
                            </Button>
                        </Card>
                    </Container>
                </OffcanvasBody>
            </Offcanvas>


        </React.Fragment>
    );
};

export default Queries;
