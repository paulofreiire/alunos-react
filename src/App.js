import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Alunos from "./components/Alunos"
import ListAlunos from './components/Tabela';


const urlApi = 'http://localhost:8080/';

class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            matricula: "",
            nome: "",
            dateNascimento: "",
            email: "",
            curso: "",
            alunos: [],
            deleteAluno: null,
            btnLabel: "Inserir"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.cleanFields = this.cleanFields.bind(this);
    }

    componentDidMount = async () => {
        axios.get(urlApi + 'alunos')
            .then(res => {
                const alunos = res.data;
                this.setState({alunos: alunos});
            })
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async handleDelete(matricula) {
        try {
            await axios.delete(urlApi + 'alunos/' + matricula)
            const alunos = this.state.alunos.filter((aluno) => aluno.matricula !== matricula)
            this.setState({alunos: alunos});
        } catch (e) {
            console.log(e)
        }
    }

    handleUpdate(matricula) {
        const aluno = this.state.alunos.filter((aluno) => aluno.matricula === matricula)

        this.setState({
            btnLabel: "ATUALIZAR",
            matricula: aluno.matricula,
            nome: aluno.nome,
            dateNascimento: aluno.dateNascimento,
            curso_id: aluno.email,
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        console.log("XD")
        const alunoState = {
            matricula: this.state.matricula,
            nome: this.state.nome,
            dateNascimento: this.state.dateNascimento,
            curso_id: this.state.email,
        }

        try {
            const aluno = (await axios.post(urlApi + 'alunos', alunoState)).data
            const alunos = [...this.state.alunos, aluno]
            this.setState({
                alunos: alunos,
                matricula: "",
                nome: "",
                dateNascimento: "",
                email: "",
            });
        } catch (e) {
            console.log(e)
        }
    }

    cleanFields() {
        this.setState({
            matricula: "",
            nome: "",
            dateNascimento: "",
            email: "",
            btnLabel: "Inserir"
        });
    }

    render() {
        return (
            <div className="App">
                <Alunos btnLabel={this.state.btnLabel}
                        aluno={this.state} handleClean={this.cleanFields}
                        atualizar={this.state.btnLabel !== "Inserir" ? true : false}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}/>
                <ListAlunos modal={this.state.modal} alunos={this.state.alunos} handleUpdate={this.handleUpdate}
                            handleDelete={this.handleDelete}/>
            </div>
        );
    }
}

export default App;
