package br.com.igreja.filters;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.util.StringUtils;

import br.com.igreja.filter.VisitanteFilter;
import br.com.igreja.model.Visitante;

public class VisitanteRepositoryImpl implements VisitanteRepositoryQuery {
	
	@PersistenceContext
	private EntityManager manager;

	@Override
	public List<Visitante> filtrarPorNome(VisitanteFilter visitanteFilter) {
		CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();
		CriteriaQuery<Visitante> query = criteriaBuilder.createQuery(Visitante.class);
		Root<Visitante> root = query.from(Visitante.class);
		
		List<Predicate> predicates = new ArrayList<>();
		if (!StringUtils.isEmpty(visitanteFilter.getNome())) {
			predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("nome")), "%" + visitanteFilter.getNome() + "%"));
		}
		
		query.where(predicates.toArray(new Predicate[predicates.size()]));
		
		return manager.createQuery(query).getResultList();
	}



}
