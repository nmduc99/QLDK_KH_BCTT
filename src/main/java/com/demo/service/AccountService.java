package com.demo.service;

import java.util.List;
import java.util.Optional;

import com.demo.entity.Account;

public interface AccountService {

	List<Account> getAll();

	Account save(Account account);

	Optional<Account> findById(Long id);

	void deleteById(Long id);

}
