using System;
using NUnit.Framework;
using Moq;
using gymNotebook.Infrastructure.Services;
using gymNotebook.Infrastructure.DTO;
using System.Threading.Tasks;
using gymNotebook.Core.Repositories;
using gymNotebook.Core.Domain;

namespace gymNotebook.Tests
{
    [TestFixture]
    public class UserServiceTests
    {
        [Test]
        public async Task get_async_should_return_propertly_dto()
        {
            var mockRepository = new Mock<IUserRepository>();

            var userService = new UserService(mockRepository.Object, null, null);

            var actual = await userService.GetAsync("user1@gmail.com");

            var user = new User("User1", "user1@gmail.com", "password", "salt");

            mockRepository.Setup(x => x.GetAsync(It.IsAny<string>())).ReturnsAsync(user);

            mockRepository.Verify(x => x.GetAsync(It.IsAny<string>()), Times.Once());

            Assert.AreEqual(user.Email, actual.Email);
        }
    }
}
