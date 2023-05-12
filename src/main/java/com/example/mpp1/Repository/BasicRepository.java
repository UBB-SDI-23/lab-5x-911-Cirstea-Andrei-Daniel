package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.IModel;
import com.example.mpp1.Model.IValidatable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface BasicRepository<T> extends JpaRepository<T, Long> {
//    private JpaRepository<T, Long> repository;
//
//    public BasicRepository(JpaRepository<T, Long> repository) {
//        this.repository = repository;
//    }
//
//    public List<IModel<T>> FindAll() {
//        return (List<IModel<T>>)repository.findAll();
//    }
//
//    public Page<IModel<T>> FindAllByOrderById(Pageable pageable) {
//        return (Page<IModel<T>>)repository.finda
//    }
//
//    int CountByUserId(Long userId);
//
//    Optional<IModel<T>> FindById(Long id);
//
//    IModel<T> Save(IModel<T> elem);
//
//    void DeleteById(Long id);
//
//    List<? extends IModel<T>> SaveAll(List<? extends IModel<T>> elements);

    Page<T> findAllByOrderById(Pageable pageable);

    int countByUserId(Long userId);

}
