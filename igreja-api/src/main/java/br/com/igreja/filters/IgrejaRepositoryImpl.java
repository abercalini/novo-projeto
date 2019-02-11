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

import br.com.igreja.filter.IgrejaFilter;
import br.com.igreja.model.Igreja;

public class IgrejaRepositoryImpl implements IgrejaRepositoryQuery {
	
	@PersistenceContext
	private EntityManager manager;

	@Override
	public List<Igreja> buscarPorNome(IgrejaFilter igrejaFilter) {
		CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();
		CriteriaQuery<Igreja> query = criteriaBuilder.createQuery(Igreja.class);
		Root<Igreja> root = query.from(Igreja.class);
		
		Predicate[] predicates = buscarPorParametros(igrejaFilter, criteriaBuilder, root);
		query.where(predicates);
		
		return manager.createQuery(query).getResultList();
	}

	private Predicate[] buscarPorParametros(IgrejaFilter igrejaFilter, CriteriaBuilder criteriaBuilder,
			Root<Igreja> root) {
		
		List<Predicate> predicates = new ArrayList<Predicate>();
		
		if(!StringUtils.isEmpty(igrejaFilter.getNome())) {
			predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("nome")), "%" + igrejaFilter.getNome() + "%"));
		}
		/*if(!StringUtils.isEmpty(igrejaFilter.getDistrito().getNome())) {
			predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("nomeDistrito")), "%" + igrejaFilter.getDistrito().getNome() + "%"));
		} */
		
		return predicates.toArray(new Predicate[predicates.size()]);
	}
	

	
}
