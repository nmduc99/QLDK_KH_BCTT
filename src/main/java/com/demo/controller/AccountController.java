package com.demo.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.demo.entity.Account;
import com.demo.service.AccountService;

@RestController
@CrossOrigin("http://localhost:3000")
public class AccountController {
	
	@Autowired
	private AccountService accountService;
	
	@GetMapping("/accounts")
	public List<Account> retrieveAllAccount()
	{
		return accountService.getAll();
	}
	
	@GetMapping("/accounts/{id}")
	public Account retrieveAccount(@PathVariable long id) {
		Optional<Account> account = accountService.findById(id);
		return account.get();
	}
	
	@DeleteMapping("/accounts/{id}")
	public void deleteAccount(@PathVariable long id) {
		accountService.deleteById(id);
	}
	
	@PostMapping("/accounts")
	public ResponseEntity<Object> createAccount(  @RequestBody Account account) {
		Account savedAccount = accountService.save(account);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedAccount.getId()).toUri();

		return ResponseEntity.created(location).build();

	}
	
	@PutMapping("/accounts/{id}")
	public ResponseEntity<Object> updateAccount(  @RequestBody Account account, @PathVariable long id) {

		Optional<Account> accountOptional = accountService.findById(id);

		if (!accountOptional.isPresent())
			return ResponseEntity.notFound().build();

		account.setId(id);
		
		accountService.save(account);

		return ResponseEntity.noContent().build();
	}
}
