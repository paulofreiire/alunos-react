import React, {useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import Modal from "./Modal";

function ListAlunos(props) {
    const [show, setShow] = useState(false);
    const [matricula, setMatricula] = useState(null);

    const handleShow = (matricula) => {
        setMatricula(matricula)
        setShow(true)
    };

    const alunos = props.alunos
    const listAlunos = alunos.map((aluno) => {
        return <tr key={aluno.matricula} >
            <th onClick={() => {props.handleUpdate(aluno.matricula)}}>{aluno.matricula}</th>
            <th onClick={() => {props.handleUpdate(aluno.matricula)}}>{aluno.nome}</th>
            <th><Button onClick={() => {handleShow(aluno.matricula)}} variant="danger" type="submit">
                REMOVER
            </Button></th>
        </tr>
    })
    return <div className="container-md">
        <Table striped bordered hover className="mt-5">
            <thead>
            <tr>
                <th>Matricula</th>
                <th>Nome Completo</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            {listAlunos}
            </tbody>
        </Table>
        <Modal show={show} matricula={matricula} setShow={setShow} handleDelete={props.handleDelete}/>
    </div>

}

export default ListAlunos;
