package ssafy.closetoyou.bookmark.infrastructure.bookmarkinformation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import ssafy.closetoyou.bookmark.service.port.BookmarkInformationRepository;

@Repository
@RequiredArgsConstructor
public class BookmarkInformationRepositoryImpl implements BookmarkInformationRepository {

    private final BookmarkInformationJpaRepository bookmarkInformationJpaRepository;


    @Override
    public BookmarkInformationEntity saveBookmarkInformation(BookmarkInformationEntity bookmarkInformationEntity) {
        return bookmarkInformationJpaRepository.save(bookmarkInformationEntity);
    }
}
