import axios from 'axios';
import { Repositorio } from 'types/repositorio';
import { config } from 'dotenv';
import { Commits } from 'types/sobre-api';

config();

const token = process.env.GITLAB_TOKEN;
const url = process.env.URLGITLAB;

const apiBase = axios.create({
  baseURL: url,
  headers: { Authorization: `Bearer ${token}` },
});

export const buscaRepositorios = async (): Promise<Repositorio[]> => {
  try {
    let pagina = 1;
    let temProjetos = true;
    const projetos: Repositorio[] = [];

    while (temProjetos) {
      const projetosPagina = await baseProjetos(pagina);
      temProjetos = projetosPagina.length > 0;
      projetos.push(
        ...projetosPagina.map(item => ({
          projeto: item.name_with_namespace,
          id: item.id,
          branches: [],
        })),
      );
      pagina++;
    }

    const reposObjetoPromises = projetos.map(async repositorio => {
      const { id } = repositorio;
      const branches = await baseBranches(id);

      const branchesData = await Promise.all(
        branches.map(async branch => {
          const { name: nameBranch } = branch;
          const commits = await baseCommits(id, nameBranch);

          const commitsData: Commits[] = commits.map(commit => ({
            id: commit.id,
            mensagem: commit.message,
            autor: commit.author_name,
            data: commit.authored_date,
          }));

          return {
            nome: nameBranch,
            commits: commitsData,
          };
        }),
      );

      repositorio.branches = branchesData;

      return repositorio;
    });

    const reposObjeto = await Promise.all(reposObjetoPromises);
    return reposObjeto;
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error.message);
    return [];
  }
};

const baseProjetos = async (page: number, itemsPorpagina = 20) => {
  const respostaPagina = await apiBase.get('/projects', {
    params: {
      page,
      per_page: itemsPorpagina,
    },
  });
  return respostaPagina.data;
};

const baseBranches = async (id: number) => {
  const resultadoBranch = await apiBase.get(
    `/projects/${id}/repository/branches`,
  );
  return resultadoBranch.data;
};

const baseCommits = async (projectId: number, branchName: string) => {
  try {
    const resultadoCommit = await apiBase.get(
      `/projects/${projectId}/repository/commits`,
      {
        params: {
          ref_name: branchName,
          per_page: 50,
          order_by: 'created_desc',
        },
      },
    );

    return resultadoCommit.data;
  } catch (error) {
    console.error(
      `Erro ao obter os commits da branch ${branchName}:`,
      error.message,
    );
    return [];
  }
};

buscaRepositorios().then(response =>
  console.log(JSON.stringify(response, null, 2)),
);
