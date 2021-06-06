package com.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.entity.Account;
import com.demo.repository.AccountRepository;
import com.demo.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService {
	@Autowired
	private AccountRepository AccRepo;
		
	@Override
	public List<Account> getAll() {
		return AccRepo.findAll();
	}
	

	@Override
	public Account save(Account account) {
		return AccRepo.save(account);
	}

	
	@Override
	public Optional<Account> findById(Long id) {
		return AccRepo.findById(id);
	}

	@Override
	public void deleteById(Long id) {
		AccRepo.deleteById(id);
	}

}
