package com.project.safedrop.config;

import com.project.safedrop.entity.TipoOcorrencia;
import com.project.safedrop.repository.TipoOcorrenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private TipoOcorrenciaRepository tipoOcorrenciaRepository;

    @Override
    public void run(String... args) throws Exception {
        if (tipoOcorrenciaRepository.count() == 0) {
            initializeTiposOcorrencia();
        }
    }

    private void initializeTiposOcorrencia() {
        TipoOcorrencia enchente = new TipoOcorrencia();
        enchente.setNome("Enchente");
        tipoOcorrenciaRepository.save(enchente);

        TipoOcorrencia incendio = new TipoOcorrencia();
        incendio.setNome("Incêndio");
        tipoOcorrenciaRepository.save(incendio);

        TipoOcorrencia terremoto = new TipoOcorrencia();
        terremoto.setNome("Terremoto");
        tipoOcorrenciaRepository.save(terremoto);

        TipoOcorrencia deslizamento = new TipoOcorrencia();
        deslizamento.setNome("Deslizamento");
        tipoOcorrenciaRepository.save(deslizamento);

        TipoOcorrencia tempestade = new TipoOcorrencia();
        tempestade.setNome("Tempestade");
        tipoOcorrenciaRepository.save(tempestade);

        TipoOcorrencia acidenteTransito = new TipoOcorrencia();
        acidenteTransito.setNome("Acidente de Trânsito");
        tipoOcorrenciaRepository.save(acidenteTransito);

        TipoOcorrencia emergenciaMedica = new TipoOcorrencia();
        emergenciaMedica.setNome("Emergência Médica");
        tipoOcorrenciaRepository.save(emergenciaMedica);

        TipoOcorrencia outros = new TipoOcorrencia();
        outros.setNome("Outros");
        tipoOcorrenciaRepository.save(outros);

        System.out.println("Tipos de ocorrência inicializados com sucesso!");
    }
}