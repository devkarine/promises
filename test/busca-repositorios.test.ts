import { buscaRepositorios } from '../src';
import { Repositorio } from 'types/repositorio';

describe('busca repositorios', () => {
  let repositorios: Repositorio[];

  beforeEach(async () => {
    repositorios = await buscaRepositorios();
  });

  it('deve retornar uma lista de repositórios', () => {
    expect(repositorios.length).toBeGreaterThan(1);
  });

  it('repositórios devem apresentar id, nome e branches', () => {
    expect(repositorios[0].id).toBeDefined();
    expect(repositorios[0].projeto).toBeDefined();
  });

  it('deve apresentar branches', () => {
    expect(repositorios[0].branches.length).toBeGreaterThan(0);
    expect(repositorios[0].branches[0].nome).toBeDefined();
  });

  it('deve apresentar os commits das branches', () => {
    expect(repositorios[0].branches[0].commits.length).toBeGreaterThan(0);
    expect(repositorios[0].branches[0].commits[0].autor).toBeDefined();
    expect(repositorios[0].branches[0].commits[0].data).toBeDefined();
    expect(repositorios[0].branches[0].commits[0].id).toBeDefined();
    expect(repositorios[0].branches[0].commits[0].mensagem).toBeDefined();
  });

  it('deve apresentar branches com commits', () => {
    for (const repositorio of repositorios) {
      for (const branch of repositorio.branches) {
        expect(branch.nome).toBeDefined();
        expect(branch.commits).toBeDefined();
        expect(branch.commits.length).toBeGreaterThan(0);
      }
    }
  });
});
